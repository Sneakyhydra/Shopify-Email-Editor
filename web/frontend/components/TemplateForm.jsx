import { useRef } from 'react';
import EmailEditor from 'react-email-editor';
import axios from 'axios';

export const TemplateForm = ({ templateId }) => {
	const emailEditorRef = useRef(null);

	const exportData = async (Html, Json, save) => {
		emailEditorRef.current.editor.exportHtml(async (data) => {
			const { design, html } = data;
			if (Html) console.log('exportHtml', html);
			if (Json) console.log('exportJson', design);
			if (save) {
				const config = {
					headers: {
						'Content-Type': 'application/json',
					},
					params: { shop: 'email-editor-assignment.myshopify.com' },
				};

				const res = await axios.post('/api/template/save', design, config);
				console.log('saving template');
			}
		});
	};

	const onLoad = async () => {
		// editor instance is created
		// you can load your template here;
		// const templateJson = {};
		// emailEditorRef.current.editor.loadDesign(templateJson);
		if (templateId) {
			const config = {
				params: { shop: 'email-editor-assignment.myshopify.com' },
			};

			const res = await axios.get(`/api/template/load/${templateId}`, config);
			emailEditorRef.current.editor.loadDesign(res.data);
		}
	};

	const onReady = () => {
		// editor is ready
		console.log('onReady');
	};

	return (
		<div>
			<div>
				<button onClick={() => exportData(true, false, false)}>
					Export HTML
				</button>
			</div>
			<br />
			<div>
				<button onClick={() => exportData(false, true, false)}>
					Export JSON
				</button>
			</div>

			<br />
			<div>
				<button onClick={() => exportData(false, false, true)}>
					Save Template
				</button>
			</div>

			<EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
		</div>
	);
};
