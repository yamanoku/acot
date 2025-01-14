import { createRule } from '@acot/core';

type Options = {};

export default createRule<Options>({
  immutable: true,
  meta: {
    tags: ['wcag21a', '1.1.1 Non-text Content'],
    recommended: true,
  },

  test: async (context) => {
    const nodes = await context.page.$$('aria/[role="img"]');

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
              message: 'img element or img role MUST has name.',
            });
          }
        } catch (e) {
          context.debug(e);
        }
      }),
    );
  },
});
