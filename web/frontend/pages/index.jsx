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
import { useAppQuery } from '../hooks';

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
	const loading = false;
	const refetching = false;
	const Templates = [];

	/* loadingMarkup uses the loading component from AppBridge and components from Polaris  */
	const loadingMarkup = loading ? (
		<Card sectioned>
			<Loading />
			<SkeletonBodyText />
		</Card>
	) : null;

	/* Use Polaris Card and EmptyState components to define the contents of the empty state */
	const emptyStateMarkup =
		!loading && !Templates?.length ? (
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

	const {
		data: templates,
		isLoading,
		isRefetching,
	} = useAppQuery({
		url: `/api/template/save`,
		reactQueryOptions: {
			/* Disable refetching because the QRCodeForm component ignores changes to its props */
			refetchOnReconnect: false,
		},
	});

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

	if (isLoading) {
		return <div>loading</div>;
	}

	console.log(templates);

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
