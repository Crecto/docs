import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Crecto',
			favicon: 'favicon.ico',
			head: [
				{
					tag: 'script',
					attrs: {
						src: 'https://analytics.watzon.tech/script.js',
						'data-website-id': '6fa9c478-7b01-4a2b-88b4-3892e055ad4d',
						async: true,
					},
				},
			],
			social: {
				github: 'https://github.com/Crecto/crecto',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						{ label: 'Getting started', link: '/guides/getting-started/' },
						{ label: 'Using Repos', link: '/guides/using-repos/' },
						{
							label: 'Models',
							items: [
								{ label: 'Schema', link: '/guides/models/schema/' },
								{ label: 'Constraints', link: '/guides/models/constraints/' },
								{ label: 'Validations', link: '/guides/models/validations/' },
								{ label: 'Associations', link: '/guides/models/associations/' },
							]
						},
						{ label: 'Changesets', link: '/guides/changesets/' },
						{ label: 'Querying the Database', link: '/guides/querying-the-database/' },
						{ label: 'Database Operations', link: '/guides/database-operations/' },
						{ label: 'Multi operations and Transactions', link: '/guides/multi-operations-and-transactions/' },
						{ label: 'Migrations', link: '/guides/migrations/' },
						{ label: 'Logging', link: '/guides/logging/' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
