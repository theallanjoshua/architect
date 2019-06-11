export const LAYOUT_ITEM = {
  position: 0,
  className: '',
  component: '',
  props: {},
  children: []
};

export const COMPONENT_MAP_ITEM = {
  component: () => {},
  props: {}
}

export const architect = (layout = [], componentMap = {}) => {
  const components = Object.keys(componentMap);
  const validComponentMap = components.reduce((acc, key) => {
    return { ...acc, [key]: { ...COMPONENT_MAP_ITEM, ...componentMap[key] } };
  }, {})
  return layout
  .map(item => ({ ...LAYOUT_ITEM, ...item}))
  .filter(({ component }) => components.indexOf(component) > -1)
  .sort((a, b) => a.position - b.position)
  .map(({ component, props, children, className }) => validComponentMap[component]
    .component(className, { ...validComponentMap[component].props, ...props }, children.length ? architect(children, validComponentMap) : null)
  );
};