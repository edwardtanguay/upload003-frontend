import { useContext } from 'react';
import { AppContext } from '../AppContext';
import * as config from '../config';

export const PageUpload = () => {
	const { handleSubmit, formFields, handleFormFieldChange, handleFileChange, uploadFile, fileItems } = useContext(AppContext);

	return (
		<div className="page pageUpload">
			<main>
				<section>
					<form id="mainForm" onSubmit={handleSubmit}>
						<fieldset>
							<legend>Enter file info and choose file:</legend>

							<label htmlFor="title">Title</label>
							<input
								type="text"
								id="title"
								autoFocus
								value={formFields.title}
								onChange={(e) =>
									handleFormFieldChange(e, 'title')
								}
							/>

							<label htmlFor="description">Description</label>
							<input
								type="text"
								id="description"
								value={formFields.description}
								onChange={(e) =>
									handleFormFieldChange(e, 'description')
								}
							/>

							<label htmlFor="notes">Notes</label>
							<input
								type="text"
								value={formFields.notes}
								onChange={(e) =>
									handleFormFieldChange(e, 'notes')
								}
							/>

							<label>File to upload</label>
							<input
								type="file"
								onChange={handleFileChange}
							></input>
							<div className="buttonArea">
								<div className="preview">
									{uploadFile.name.endsWith('.jpg') ||
									uploadFile.name.endsWith('.png') ? (
										<img
											src={uploadFile.preview}
											width="100"
											height="100"
										/>
									) : (
										<div className="previewFileName">
											{uploadFile.name}
										</div>
									)}
								</div>
								<div className="buttonWrapper">
									<button type="submit">Submit</button>
								</div>
							</div>
						</fieldset>
					</form>
				</section>
				<section className="fileItemsArea">
					{fileItems.length < 2 && <h2>File Items</h2>}
					{fileItems.length >= 2 && (
						<h2>{fileItems.length} File Items</h2>
					)}
					{fileItems.length === 0 && (
						<p>There are {fileItems.length} file items</p>
					)}
					{fileItems.map((fileItem, i) => {
						return (
							<div className="fileItem" key={i}>
								<img
									src={`${config.backendUrl}/${fileItem.iconPathAndFileName}`}
								/>
								<div className="info">
									<div className="title">
										{fileItem.title}
									</div>
									<div className="description">
										{fileItem.description}
									</div>
									<div className="notes">
										{fileItem.notes}
									</div>
									<div className="fileName">
										<a
											target="_blank"
											href={`${config.backendUrl}/uploadedFiles/${fileItem.fileName}`}
										>
											{fileItem.fileName}
										</a>
									</div>
								</div>
							</div>
						);
					})}
				</section>
			</main>
		</div>
	);
};
