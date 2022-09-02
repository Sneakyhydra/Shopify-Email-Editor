import { useEffect, useState } from 'react';
import {
	Card,
	EmptyState,
	Layout,
	Page,
	SkeletonBodyText,
	Button,
} from '@shopify/polaris';

import { useNavigate } from 'react-router';
import axios from 'axios';

export default function HomePage() {
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

	const handleClick = (template) => {
		navigate(`/template/${template.templateId}`);
	};

	const loadingMarkup =
		templates.length === 0 ? (
			<Card sectioned>
				<SkeletonBodyText />
			</Card>
		) : null;

	const emptyStateMarkup =
		templates.length === 0 ? (
			<Card sectioned>
				<EmptyState
					heading='Create emails'
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

	if (templates.length === 0) {
		return <div>loading</div>;
	}

	console.log(templates);
	const notEmpty =
		templates.length > 0 ? (
			<div>
				<Button onClick={() => navigate('/template/create')}>
					Create Template
				</Button>
				<Card sectioned>
					{templates.map((template) => {
						return (
							<Card.Section key={template._id}>
								<Button onClick={() => handleClick(template)}>
									{template.templateId}
								</Button>
							</Card.Section>
						);
					})}
				</Card>
			</div>
		) : null;

	return (
		<Page>
			<Layout>
				<Layout.Section>
					{loadingMarkup}
					{emptyStateMarkup}
					{notEmpty}
				</Layout.Section>
			</Layout>
		</Page>
	);
}
