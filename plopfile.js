module.exports = (plop) => {
    plop.setGenerator('React Component', {
        description: 'Create a new React component',
        prompts: [
            {
                type: 'prompt',
                name: 'componentName',
                message: 'Name of your component:',
            },
        ],
        actions: () => {
            const actions = [
                {
                    type: 'add',
                    path:
                        './components/{{properCase componentName}}/index.tsx',
                    templateFile: './config/plop/component/index.tsx.plop',
                },
                {
                    type: 'add',
                    path:
                        './components/{{properCase componentName}}/{{properCase componentName}}.tsx',
                    templateFile: './config/plop/component/component.tsx.plop',
                },
                {
                    type: 'add',
                    path:
                        './components/{{properCase componentName}}/{{properCase componentName}}.module.scss',
                    templateFile: './config/plop/component/component.module.scss.plop',
                },
            ];

            return actions;
        },
    });
};
