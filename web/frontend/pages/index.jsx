import { useEffect, useState } from 'react';
import {
	Card,
	EmptyState,
	Layout,
	Page,
	SkeletonBodyText,
} from '@shopify/polaris';

import { useNavigate } from 'react-router';
import axios from 'axios';

export default function HomePage() {
	/*
    These are mock values. Setting these values lets you preview the loading markup and the empty state.
  */
	const navigate = useNavigate();
	const [templates, setTemplates] = useState([]);

	useEffect(() => {
		const loadTemplates = async () => {
			const res = await axios.get('/api/template/save', {
				params: { shop: 'email-editor-assignment.myshopify.com' },
			});
			setTemplates(res.data);
		};
		loadTemplates();
	}, []);

	/* loadingMarkup uses the loading component from AppBridge and components from Polaris  */
	const loadingMarkup =
		templates.length === 0 ? (
			<Card sectioned>
				<SkeletonBodyText />
			</Card>
		) : null;

	/* Use Polaris Card and EmptyState components to define the contents of the empty state */
	const emptyStateMarkup =
		templates.length !== 0 ? (
			<Card sectioned>
				<EmptyState
					heading='Create emails'
					/* This button will take the user to a Create a QR code page */
					action={{
						content: 'Create Template',
						onAction: () => navigate('/template/create'),
					}}
					image='https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png'
				>
					<p>Allow customers to create templates and send emails</p>
				</EmptyState>
			</Card>
		) : null;

	/*
    Use Polaris Page and TitleBar components to create the page layout,
    and include the empty state contents set above.
  */

	if (templates.length === 0) {
		return <div>loading</div>;
	}

	console.log(templates);

	return (
		<Page>
			<Layout>
				<Layout.Section>
					{loadingMarkup}
					{emptyStateMarkup}
				</Layout.Section>
			</Layout>
		</Page>
	);
}
