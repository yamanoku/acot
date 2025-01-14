import { createRule } from '@acot/core';

type Options = {};

export default createRule<Options>({
  immutable: true,
  meta: {
    tags: [
      'wcag21a',
      '2.4.4 Link Purpose (In Context)',
      '4.1.2 Name, Role, Value',
    ],
    recommended: true,
  },

  test: async (context) => {
    const nodes = await context.page.$$('aria/[role="link"]');

    await Promise.all(
      nodes.map(async (node) => {
        try {
          const name = await node.evaluate(async (el) => {
            const ax = await (window as any).getComputedAccessibleNode(el);
            return (ax?.name ?? '').trim();
          });

          context.debug('name: %s', name);

          if (!name) {
            await context.report({
              node,
              message: 'Link MUST has name.',
            });
          }
        } catch (e) {
          context.debug(e);
        }
      }),
    );
  },
});
