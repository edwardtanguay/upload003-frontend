import { useState, useEffect } from 'react';
import axios from 'axios';
import {
	IFormFields,
	IFileItem,
	_initialFormFields,
	_initialUploadFile,
	IUploadFile,
} from './interfaces';
import * as config from './config';

import { createContext } from 'react';

interface IAppContext {
	handleSubmit: (e: any) => void;
	formFields: IFormFields;
	handleFormFieldChange: (e: any, fieldName: string) => void;
	handleFileChange: (e: any) => void;
	uploadFile: IUploadFile;
	fileItems: IFileItem[];
}

// TODO: rename IFormFields to IForm

interface IAppProvider {
	children: React.ReactNode;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [uploadFile, setUploadFile] = useState<IUploadFile>({
		..._initialUploadFile,
	});
	const [formFields, setFormFields] = useState<IFormFields>({
		..._initialFormFields,
	});
	const [status, setStatus] = useState('');
	const [fileItems, setFileItems] = useState<IFileItem[]>([]);

	const fetchFileItems = () => {
		(async () => {
			setFileItems(
				(await axios.get(`${config.backendUrl}/fileitems`)).data
			);
		})();
	};

	useEffect(() => {
		fetchFileItems();
	}, []);

	// TODO: resolve all TypeScript anys on this page
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (uploadFile.data && formFields.title.trim() !== '') {
			e.preventDefault();
			let formData = new FormData();
			formData.append('file', uploadFile.data);
			formData.append('title', formFields.title);
			formData.append('description', formFields.description);
			formData.append('notes', formFields.notes);
			formData.append('fileName', (uploadFile.data as any).name);
			const response = await fetch(`${config.backendUrl}/uploadfile`, {
				method: 'POST',
				body: formData,
			});
			if (response) setStatus(response.statusText);
			(document.getElementById('mainForm') as any).reset();
			setFormFields({ ..._initialFormFields });
			setUploadFile({ ..._initialUploadFile });
			fetchFileItems();
		}
	};

	const handleFileChange = (e: any) => {
		const file = e.target.files[0];
		setStatus('');
		const _uploadFile = {
			name: file.name,
			preview: URL.createObjectURL(file),
			data: e.target.files[0],
		};
		setUploadFile(_uploadFile);
	};

	const handleFormFieldChange = (e: any, fieldName: string) => {
		const value = e.target.value;
		formFields[fieldName as keyof IFormFields] = value;
		setFormFields({ ...formFields });
	};

	return (
		<AppContext.Provider
			value={{
				handleSubmit,
				formFields,
				handleFormFieldChange,
				handleFileChange,
				uploadFile,
				fileItems
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
