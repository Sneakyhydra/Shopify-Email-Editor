import { Page } from '@shopify/polaris';
import { TemplateForm } from '../../components';

export default function ManageCode() {
	const breadcrumbs = [{ content: 'Templates', url: '/' }];

	return (
		<Page>
			<TemplateForm />
		</Page>
	);
}
