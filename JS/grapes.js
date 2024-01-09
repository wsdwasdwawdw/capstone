

const editor = grapesjs.init({
  // Indicate where to init the editor. You can also pass an HTMLElement
  container: '#gjs',
  // Get the content for the canvas directly from the element
  // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
  fromElement: true,
  // Size of the editor
  height: '100%',
  width: 'auto',
  // Disable the storage manager for the moment
  storageManager: false,
  // Avoid any default panel
  layerManager: {
    appendTo: '.layers-container'
  },
  panels: { defaults: [{
    id: 'layers',
    el: '.panel__right',
    // Make the panel resizable
      resizable: {
        maxDim: 350,
        minDim: 200,
        tc: 0, // Top handler
        cl: 1, // Left handler
        cr: 0, // Right handler
        bc: 0, // Bottom handler
        // Being a flex child we need to change `flex-basis` property
        // instead of the `width` (default)
        keyWidth: 'flex-basis',
      },
    
    },
    {
      id: 'panel-devices',
      el: '.panel__devices',
      buttons: [{
          id: 'device-desktop',
          label: 'D',
          command: 'set-device-desktop',
          active: true,
          togglable: false,
        }, {
          id: 'device-mobile',
          label: 'M',
          command: 'set-device-mobile',
          togglable: false,
      }],
    },
    {
      id: 'panel-switcher',
      el: '.panel__switcher',
      buttons: [{
          id: 'show-layers',
          active: true,
          label: 'Layers',
          command: 'show-layers',
          // Once activated disable the possibility to turn it off
          togglable: false,
        }, {
          id: 'show-style',
          active: true,
          label: 'Styles',
          command: 'show-styles',
          togglable: false,
        },{
          id: 'show-traits',
          active: true,
          label: 'Traits',
          command: 'show-traits',
          togglable: false,
        },{
          id: 'show-blocks',
          active: true,
          label: 'Blocks',
          command: 'show-blocks',
          togglable: false,
        }],
    },
  ] 
  },
  blockManager: {
    appendTo: '.blocks-container',
    
    blocks: []
  },
  traitManager: {
    appendTo: '.traits-container',
  },
  // The Selector Manager allows to assign classes and
  // different states (eg. :hover) on components.
  // Generally, it's used in conjunction with Style Manager
  // but it's not mandatory
  selectorManager: {
    componentFirst: true,
    appendTo: '.styles-container'
  },
  styleManager: {
    appendTo: '.styles-container',
    sectors: [
      {
        name: 'General',
        open: false,
        properties:[
          {
            extend: 'float',
            type: 'radio',
            default: 'none',
            options: [
              { value: 'none', className: 'fa fa-times'},
              { value: 'left', className: 'fa fa-align-left'},
              { value: 'right', className: 'fa fa-align-right'}
            ],
          },
          'display',
          { extend: 'position', type: 'select' },
          'top',
          'right',
          'left',
          'bottom',
        ],
      }, {
          name: 'Dimension',
          open: false,
          properties: [
            'width',
            {
              id: 'flex-width',
              type: 'integer',
              name: 'Width',
              units: ['px', '%'],
              property: 'flex-basis',
              toRequire: 1,
            },
            'height',
            'max-width',
            'min-height',
            'margin',
            'padding'
          ],
        },{
          name: 'Typography',
          open: false,
          properties: [
              'font-family',
              'font-size',
              'font-weight',
              'letter-spacing',
              'color',
              'line-height',
              {
                extend: 'text-align',
                options: [
                  { id : 'left',  label : 'Left',    className: 'fa fa-align-left'},
                  { id : 'center',  label : 'Center',  className: 'fa fa-align-center' },
                  { id : 'right',   label : 'Right',   className: 'fa fa-align-right'},
                  { id : 'justify', label : 'Justify',   className: 'fa fa-align-justify'}
                ],
              },
              {
                property: 'text-decoration',
                type: 'radio',
                default: 'none',
                options: [
                  { id: 'none', label: 'None', className: 'fa fa-times'},
                  { id: 'underline', label: 'underline', className: 'fa fa-underline' },
                  { id: 'line-through', label: 'Line-through', className: 'fa fa-strikethrough'}
                ],
              },
              'text-shadow'
          ],
        },{
          name: 'Decorations',
          open: false,
          properties: [
            'opacity',
            'border-radius',
            'border',
            'box-shadow',
            'background' // { id: 'background-bg', property: 'background', type: 'bg' }
          ],
        },{
          name: 'Extra',
          open: false,
          buildProps: [
            'transition',
            'perspective',
            'transform'
          ],
        },{
          name: 'Flex',
          open: false,
          properties: [{
            name: 'Flex Container',
            property: 'display',
            type: 'select',
            defaults: 'block',
            list: [
              { value: 'block', name: 'Disable'},
              { value: 'flex', name: 'Enable'}
            ],
          },{
            name: 'Flex Parent',
            property: 'label-parent-flex',
            type: 'integer',
          },{
            name: 'Direction',
            property: 'flex-direction',
            type: 'radio',
            defaults: 'row',
            list: [{
              value: 'row',
              name: 'Row',
              className: 'icons-flex icon-dir-row',
              title: 'Row',
            },{
              value: 'row-reverse',
              name: 'Row reverse',
              className: 'icons-flex icon-dir-row-rev',
              title: 'Row reverse',
            },{
              value: 'column',
              name: 'Column',
              title: 'Column',
              className: 'icons-flex icon-dir-col',
            },{
              value: 'column-reverse',
              name: 'Column reverse',
              title: 'Column reverse',
              className: 'icons-flex icon-dir-col-rev',
            }],
          },{
            name: 'Justify',
            property: 'justify-content',
            type: 'radio',
            defaults: 'flex-start',
            list: [{
              value: 'flex-start',
              className: 'icons-flex icon-just-start',
              title: 'Start',
            },{
              value: 'flex-end',
              title: 'End',
              className: 'icons-flex icon-just-end',
            },{
              value: 'space-between',
              title: 'Space between',
              className: 'icons-flex icon-just-sp-bet',
            },{
              value: 'space-around',
              title: 'Space around',
              className: 'icons-flex icon-just-sp-ar',
            },{
              value: 'center',
              title: 'Center',
              className: 'icons-flex icon-just-sp-cent',
            }],
          },{
            name: 'Align',
            property: 'align-items',
            type: 'radio',
            defaults: 'center',
            list: [{
              value: 'flex-start',
              title: 'Start',
              className: 'icons-flex icon-al-start',
            },{
              value: 'flex-end',
              title: 'End',
              className: 'icons-flex icon-al-end',
            },{
              value: 'stretch',
              title: 'Stretch',
              className: 'icons-flex icon-al-str',
            },{
              value: 'center',
              title: 'Center',
              className: 'icons-flex icon-al-center',
            }],
          },{
            name: 'Flex Children',
            property: 'label-parent-flex',
            type: 'integer',
          },{
            name: 'Order',
            property: 'order',
            type: 'integer',
            defaults: 0,
            min: 0
          },{
            name: 'Flex',
            property: 'flex',
            type: 'composite',
            properties  : [{
              name: 'Grow',
              property: 'flex-grow',
              type: 'integer',
              defaults: 0,
              min: 0
            },{
              name: 'Shrink',
              property: 'flex-shrink',
              type: 'integer',
              defaults: 0,
              min: 0
            },{
              name: 'Basis',
              property: 'flex-basis',
              type: 'integer',
              units: ['px','%',''],
              unit: '',
              defaults: 'auto',
            }],
          },{
            name: 'Align-self',
            property: 'align-self',
            type: 'radio',
            defaults: 'auto',
            list: [{
              value: 'auto',
              name: 'Auto',
            },{
              value: 'flex-start',
              title: 'Start',
              className: 'icons-flex icon-al-start',
            },{
              value   : 'flex-end',
              title: 'End',
              className: 'icons-flex icon-al-end',
            },{
              value   : 'stretch',
              title: 'Stretch',
              className: 'icons-flex icon-al-str',
            },{
              value   : 'center',
              title: 'Center',
              className: 'icons-flex icon-al-center',
            }],
          }]
        }]
  },
  deviceManager: {
    devices: [{
        name: 'Desktop',
        width: '', // default size
      }, {
        name: 'Mobile',
        width: '320px', // this value will be used on canvas width
        widthMedia: '480px', // this value will be used in CSS @media
    }]
  },
  plugins: [
    'gjs-blocks-basic',
    'grapesjs-plugin-forms',
    'grapesjs-component-countdown',
    'grapesjs-plugin-export',
    'grapesjs-tabs',
    'grapesjs-custom-code',
    'grapesjs-touch',
    'grapesjs-parser-postcss',
    'grapesjs-tooltip',
    'grapesjs-tui-image-editor',
    'grapesjs-typed',
    'grapesjs-style-bg',
    'grapesjs-preset-webpage',
  ],
  pluginsOpts: {
    'gjs-blocks-basic': { flexGrid: true },
    'grapesjs-tui-image-editor': {
      script: [
        //'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.6.7/fabric.min.js',
        'https://uicdn.toast.com/tui.code-snippet/v1.5.2/tui-code-snippet.min.js',
        'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.js',
        'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.js'
      ],
      style: [
        'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.css',
        'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.css',
      ],
    },
    'grapesjs-tabs': {
      tabsBlock: { category: 'Extra' }
    },
    'grapesjs-typed': {
      block: {
        category: 'Extra',
        content: {
          type: 'typed',
          'type-speed': 40,
          strings: [
            'Text row one',
            'Text row two',
            'Text row three',
          ],
        }
      }
    },
  },
});

editor.I18n.addMessages({
  en: {
    styleManager: {
      properties: {
        'background-repeat': 'Repeat',
        'background-position': 'Position',
        'background-attachment': 'Attachment',
        'background-size': 'Size',
      }
    },
  }
});

var openBlocksBtn = editor.Panels.getButton('views', 'open-blocks');
openBlocksBtn && openBlocksBtn.set('active', 1);


editor.Panels.addPanel({
  id: 'panel-top',
  el: '.panel__top',
});
editor.Panels.addPanel({
  id: 'basic-actions',
  el: '.panel__basic-actions',
  buttons: [
    {
      id: 'visibility',
      active: true, // active by default
      className: 'btn-toggle-borders',
      label: '<u>B</u>',
      command: 'sw-visibility', // Built-in command
    }, {
      id: 'export',
      className: 'btn-open-export',
      label: 'Exp',
      command: 'export-template',
      context: 'export-template', // For grouping context of buttons from the same panel
    }, {
      id: 'show-json',
      className: 'btn-show-json',
      label: 'JSON',
      context: 'show-json',
      command(editor) {
        editor.Modal.setTitle('Components JSON')
          .setContent(`<textarea style="width:100%; height: 250px;">
            ${JSON.stringify(editor.getComponents())}
          </textarea>`)
          .open();
      },
    }
  ],
});

editor.Commands.add('show-layers', {
  getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
  getLayersEl(row) { return row.querySelector('.layers-container') },

  run(editor, sender) {
    const lmEl = this.getLayersEl(this.getRowEl(editor));
    lmEl.style.display = '';
  },
  stop(editor, sender) {
    const lmEl = this.getLayersEl(this.getRowEl(editor));
    lmEl.style.display = 'none';
  },
});

editor.Commands.add('show-styles', {
  getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
  getStyleEl(row) { return row.querySelector('.styles-container') },

  run(editor, sender) {
    const smEl = this.getStyleEl(this.getRowEl(editor));
    smEl.style.display = '';
  },
  stop(editor, sender) {
    const smEl = this.getStyleEl(this.getRowEl(editor));
    smEl.style.display = 'none';
  },
});


editor.Commands.add('show-traits', {
  getTraitsEl(editor) {
    const row = editor.getContainer().closest('.editor-row');
    return row.querySelector('.traits-container');
  },
  run(editor, sender) {
    this.getTraitsEl(editor).style.display = '';
  },
  stop(editor, sender) {
    this.getTraitsEl(editor).style.display = 'none';
  },
});

editor.Commands.add('show-blocks', {
  getTraitsEl(editor) {
    const row = editor.getContainer().closest('.editor-row');
    return row.querySelector('.blocks-container');
  },
  run(editor, sender) {
    this.getTraitsEl(editor).style.display = '';
  },
  stop(editor, sender) {
    this.getTraitsEl(editor).style.display = 'none';
  },
});


editor.Commands.add('set-device-desktop', {
  run: editor => editor.setDevice('Desktop')
});
editor.Commands.add('set-device-mobile', {
  run: editor => editor.setDevice('Mobile')
});


