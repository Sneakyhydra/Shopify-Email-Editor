import { useRef } from 'react';
import { useNavigate, TitleBar, Loading } from '@shopify/app-bridge-react';
import {
	Card,
	EmptyState,
	Layout,
	Page,
	SkeletonBodyText,
} from '@shopify/polaris';
import EmailEditor from 'react-email-editor';

export default function HomePage() {
	/*
    Add an App Bridge useNavigate hook to set up the navigate function.
    This function modifies the top-level browser URL so that you can
    navigate within the embedded app and keep the browser in sync on reload.
  */
	const navigate = useNavigate();

	/*
    These are mock values. Setting these values lets you preview the loading markup and the empty state.
  */
	const isLoading = false;
	const isRefetching = false;
	const Templates = [];

	/* loadingMarkup uses the loading component from AppBridge and components from Polaris  */
	const loadingMarkup = isLoading ? (
		<Card sectioned>
			<Loading />
			<SkeletonBodyText />
		</Card>
	) : null;

	/* Use Polaris Card and EmptyState components to define the contents of the empty state */
	const emptyStateMarkup =
		!isLoading && !Templates?.length ? (
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
	const emailEditorRef = useRef(null);

	const exportHtml = () => {
		emailEditorRef.current.editor.exportHtml((data) => {
			const { design, html } = data;
			console.log('exportHtml', html);
		});
	};

	const onLoad = () => {
		// editor instance is created
		// you can load your template here;
		// const templateJson = {};
		// emailEditorRef.current.editor.loadDesign(templateJson);
	};

	const onReady = () => {
		// editor is ready
		console.log('onReady');
	};

	return (
		<Page>
			<TitleBar
				title='Templates'
				primaryAction={{
					content: 'Create Template',
					onAction: () => navigate('/template/create'),
				}}
			/>
			<Layout>
				<Layout.Section>
					{loadingMarkup}
					{emptyStateMarkup}
				</Layout.Section>
			</Layout>
		</Page>
	);
}
