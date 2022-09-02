import { Page } from '@shopify/polaris';
import { TemplateForm } from '../../components';

const TemplateEdit = () => {
	const templateId = window.location.pathname.slice(10);
	return (
		<Page>
			<TemplateForm templateId={templateId} />
		</Page>
	);
};

export default TemplateEdit;
