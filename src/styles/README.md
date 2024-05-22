# SCSS Documentation

This document provides an overview of the SCSS styles used in our work-report project.

## Structure

Our SCSS is organized under __/styles__ directory:

### Think in Blocks

 **Styles guide Rules of Thumb **: 
 1. App.scss file serves as the location of single use classes.
 2. Whenever possible distributed styles will be abstracted to _category.scss_ files
 3. React Component className will be PascalCase *e.g* LikeThis or SomethingLikeThis
 4. Sub blocks or elements will be snake-case *e.g* like-this or maybe-like-this

2. ***Imported Stylesheets**:
### Current extracted scss
1. animations_transition.scss
2. forms.scss
3. layout.scss
4. loading_spinners.scss
5. media_queries.scss
6. splash.scss
7. table.scss
8. ui_components.scss
9. variables.scss

### Naming Conventions

We follow the BEM (Block Element Modifier) naming convention for our classes. For example:
- `.block` for block-level components. __Standalone Element__ e.g ****_ul_ or _action-container_****
- `.block.__element` for elements within a block. __Dependent Element__ e.g ****_li_ or _button_****
- `.block.__element.--modifier` for modifiers that change a block's appearance. __Skin or Customization__ e.g ****--large or --success or --disabled****
<sub> class names will not be concatenated </sub> ~.action-container__button--primary~
They will look similar to the above examples .action-container.__button.--primary
### Maintenance Guidelines

- Avoid excessive nesting to keep our styles maintainable. At most consider 3 levels deep.