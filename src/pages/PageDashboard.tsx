import { useContext } from 'react';
import { AppContext } from '../AppContext';

export const PageDashboard = () => {
	const { fileItems } = useContext(AppContext);

	return (
		<div className="page pageDashboard">
			<h2>There are {fileItems.length} files uploaded.</h2>
			<ul>
				{fileItems.map((fileItem, index) => {
					return (
						<li key={index}>{fileItem.title}</li>
					)
				})}
			</ul>

		</div>
	);
};