import { useRef } from 'react';
import EmailEditor from 'react-email-editor';

export const TemplateForm = (props) => {
	const emailEditorRef = useRef(null);

	const exportData = async (Html, Json, save) => {
		emailEditorRef.current.editor.exportHtml((data) => {
			const { design, html } = data;
			if (Html) console.log('exportHtml', html);
			if (Json) console.log('exportJson', design);
			if (save) {
				console.log('saving template');
			}
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
