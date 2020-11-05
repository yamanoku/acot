import { createRule } from '@acot/core';
import { getEventListeners } from '@acot/utils';

// FIXME @masuP9

type Options = {};

const SELECTOR = [
  'base',
  'body',
  'button',
  'head',
  'html',
  'input',
  'link',
  'meta',
  'noscript',
  'script',
  'slot',
  'style',
  'template',
  'title',
]
  .map((s) => `:not(${s})`)
  .join('');

export default createRule<Options>({
  type: 'global',
  meta: {
    recommended: true,
  },

  test: async (context) => {
    try {
      const elements = await context.page.$$(SELECTOR);

      await Promise.all(
        elements.map(async (node) => {
          // if focusable
          // TODO refactor
          const focusable = await node.evaluate((el) => {
            let tabindex: number | null = parseInt(
              el.getAttribute('tabindex') || '',
              10,
            );

            tabindex = !Number.isNaN(tabindex) ? tabindex : null;

            if (tabindex != null && tabindex >= 0) {
              return true;
            }

            if (el instanceof HTMLElement) {
              try {
                el.focus();
                return document.activeElement === el;
              } catch (e) {}
            }

            return false;
          });

          context.debug('focusable: %O', focusable);

          const listeners = await getEventListeners(node);
          if (listeners.length === 0 && !focusable) {
            return;
          }

          const hasClick = listeners.some(({ type }) => type === 'click');
          const hasKeyboard = listeners.some(
            ({ type }) =>
              type === 'keydown' || type === 'keypress' || type === 'keyup',
          );

          context.debug({ hasClick, hasKeyboard });

          if (hasClick && !hasKeyboard) {
            await context.report({
              node,
              message:
                'Interactive element MUST have the same handler as the click event.',
            });
          }
        }),
      );
    } catch (e) {
      context.debug('error: ', e);
    }
  },
});
