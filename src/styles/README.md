# SCSS Documentation

This document provides an overview of the SCSS styles used in our work-report project.

## Structure

Our SCSS is organized under __/styles__ directory:

### __Think in Blocks__

1. **Layout**: Most layout structures Navbar, Sidebar, Footer & MainContainer will be located in App.scss.
 1. Whenever possible distributed styles will be abstracted to _encapsulating.scss_
 2. React Components className will be PascalCase e.g LikeThis
 3. Sub blocks will be snake-case e.g like-this

2. **Imported Stylesheets**:
### __Current encapsulated scss__
1. variables.scss
2. forms.scs
3. media_queries.scss


### Naming Conventions

We follow the BEM (Block Element Modifier) naming convention for our classes. For example:
- `.block` for block-level components. __Standalone Element__ e.g ****_ul_ || _action-container_****
- `.block__element` for elements within a block. __Dependent Element__ e.g ****_li_ || _button_****
- `.block--modifier` for modifiers that change a block's appearance. __Skin or Customization__ e.g ****--large || --success || --disabled****

### Maintenance Guidelines

- Avoid excessive nesting to keep our styles maintainable. At most consider 3 levels deep.