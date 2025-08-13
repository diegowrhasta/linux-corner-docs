// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Diego\'s Linux Corner',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/diegowrhasta/linux-corner-docs' }],
			sidebar: [
				{
					label: "Guides",
					autogenerate: { directory: 'guides' },
				},
				{
					label: 'Personal Settings',
					autogenerate: { directory: 'settings' },
				},
			],
		}),
	],
});
