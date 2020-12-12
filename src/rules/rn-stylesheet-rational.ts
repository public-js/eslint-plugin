import { TSESLint, TSESTree } from '@typescript-eslint/experimental-utils';
import { RuleContext } from '@typescript-eslint/experimental-utils/dist/ts-eslint/Rule';
import * as util from '../util';

import orderGroups from './rational-order-groups';

const ruleCreate = (context: Readonly<RuleContext<MessageIds, Options>>, [options]: Readonly<Options>) => {
  // const ignoreClassNames = options.ignoreClassNames ?? false;
  // const ignoreStyleProperties = options.ignoreStyleProperties ?? false;
  const rationalGroups = orderGroups(options.borderInBoxModel ?? false);
  const sourceCode = context.getSourceCode();

  const findIx = (prop: string): number => {
    const ix = rationalGroups.indexOf(prop);
    return ix >= 0 ? ix : 99999;
  };
  const isValidOrder = (a: string, b: string): boolean => findIx(a) <= findIx(b);

  function sort(array: TSESTree.Node[]) {
    return [...array].sort((a, b) => {
      const identifierA = findIx(util.astHelpersRN.getStylePropertyIdentifier(a));
      const identifierB = findIx(util.astHelpersRN.getStylePropertyIdentifier(b));
      if (identifierA < identifierB) {
        return -1;
      } else if (identifierA > identifierB) {
        return 1;
      }
      return 0;
    });
  }

  // @ts-ignore
  function report(array: TSESTree.Node[], type: any, node: any, prev: TSESTree.Property, current: TSESTree.Property) {
    const currentName = util.astHelpersRN.getStylePropertyIdentifier(current);
    const prevName = util.astHelpersRN.getStylePropertyIdentifier(prev);

    const hasComments = array
        .map((prop: TSESTree.Node) =>
            sourceCode.getComments(prop))
        .reduce((hasComment: boolean, comment) =>
            hasComment || comment.leading.length > 0 || comment.trailing.length > 0, // trailing length ?
            false);

    context.report({
      node,
      messageId: 'propsOrder',
      data: {
        currentName,
        prevName,
      },
      fix: hasComments
          ? undefined
          : (fixer): TSESLint.RuleFix[] => {
            const sortedArray = sort(array);
            return array
                .map((item: TSESTree.Node, i: number) =>
                    item === sortedArray[i]
                        ? null
                        : fixer.replaceText(item, sourceCode.getText(sortedArray[i])))
                .filter(item => !!item) as TSESLint.RuleFix[];
          },
    });
  }

  function checkIsSorted(array: TSESTree.Node[], arrayName: string, node: any) {
    for (let i = 1; i < array.length; i += 1) {
      const previous = array[i - 1];
      const current = array[i];

      if (previous.type !== 'Property' || current.type !== 'Property') {
        return;
      }

      const prevName = util.astHelpersRN.getStylePropertyIdentifier(previous);
      const currentName = util.astHelpersRN.getStylePropertyIdentifier(current);

      if (!isValidOrder(prevName, currentName)) {
        return report(array, arrayName, node, previous, current);
      }
    }
  }

  return {
    CallExpression: function (node: TSESTree.Node) {
      if (!util.astHelpersRN.isStyleSheetDeclaration(node, context.settings)) {
        return;
      }
      const classDefinitionsChunks = util.astHelpersRN.getStyleDeclarationsChunks(node);

      // if (!ignoreClassNames) {
      //   classDefinitionsChunks.forEach((classDefinitions) => {
      //     checkIsSorted(classDefinitions, 'class names', node);
      //   });
      // }

      // if (ignoreStyleProperties) {
      //   return;
      // }

      classDefinitionsChunks.forEach((classDefinitions) => {
        classDefinitions.forEach((classDefinition) => {
          // @ts-ignore
            const styleProperties = classDefinition.value.properties;
          if (!styleProperties || styleProperties.length < 2) {
            return;
          }
          const stylePropertyChunks = util.astHelpersRN.getPropertiesChunks(styleProperties);
          stylePropertyChunks.forEach((stylePropertyChunk) => {
            checkIsSorted(stylePropertyChunk, 'style properties', node);
          });
        });
      });
    },
  };
};

export type Options = [{
  borderInBoxModel?: boolean;
  // ignoreClassNames?: boolean;
  // ignoreStyleProperties?: boolean;
}];

export type MessageIds = 'propsOrder';

export default util.createRule<Options, MessageIds>({
  name: 'rn-stylesheet-rational',
  meta: {
    type: 'layout',
    docs: {
      description: 'Bans specific types from being used',
      category: 'Best Practices',
      recommended: 'warn',
    },
    fixable: 'code',
    messages: {
      propsOrder: "Property `{{currentName}}` should be before `{{prevName}}`.",
    },
    schema: [{
      type: 'object',
      properties: {
        borderInBoxModel: {
          type: 'boolean'
        },
        // ignoreClassNames: {
        //   type: 'boolean'
        // },
        // ignoreStyleProperties: {
        //   type: 'boolean'
        // }
      },
      additionalProperties: false
    }]
  },
  defaultOptions: [{
    borderInBoxModel: false,
    // ignoreClassNames: false,
    // ignoreStyleProperties: false
  }],
  create: ruleCreate,
});
