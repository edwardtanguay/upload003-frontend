export interface IFormFields {
	title: string;
	description: string;
	notes: string;
}

export interface IFileItem {
	title: string;
	description: string;
	notes: string;
	fileName: string;
	iconPathAndFileName: string;
}

export interface IUploadFile {
	preview: string;
	data: string;
	name: string;
}

export const _initialFormFields = {
	title: '',
	description: '',
	notes: '',
};

export const _initialUploadFile = {
	preview: '',
	data: '',
	name: '',
};

