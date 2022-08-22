import { Page } from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';
import { TemplateForm } from '../../components';

export default function ManageCode() {
	const breadcrumbs = [{ content: 'Templates', url: '/' }];

	return (
		<Page>
			<TitleBar
				title='Create Template'
				breadcrumbs={breadcrumbs}
				primaryAction={null}
			/>
			<TemplateForm />
		</Page>
	);
}
