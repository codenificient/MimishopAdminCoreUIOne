import { CBadge, CCard, CCardBody, CCardHeader, CCol, CDataTable, CPagination, CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import usersData from './UsersData';

const getBadge = (status) => {
	switch (status) {
		case 'Active':
			return 'success';
		case 'Inactive':
			return 'secondary';
		case 'Pending':
			return 'warning';
		case 'Banned':
			return 'danger';
		default:
			return 'primary';
	}
};

const Users = () => {
	const history = useHistory();
	const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
	const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
	const [ page, setPage ] = useState(currentPage);

	const pageChange = (newPage) => {
		currentPage !== newPage && history.push(`/users?page=${newPage}`);
	};

	let paginat = 15;
	const numPages = Math.ceil(usersData.length / paginat);

	useEffect(
		() => {
			currentPage !== page && setPage(currentPage);
		},
		[ currentPage, page ]
	);

	// console.log(usersData.length)

	return (
		<CRow>
			<CCol xl={12}>
				<CCard>
					<CCardHeader>
						Users
						<small className="text-muted"> example</small>
					</CCardHeader>
					<CCardBody>
						<CDataTable
							items={usersData}
							fields={[ { key: 'name', _classes: 'font-weight-bold' }, 'registered', 'role', 'status' ]}
							hover
							striped
							itemsPerPage={paginat}
							activePage={page}
							clickableRows
							onRowClick={(item) => history.push(`/users/${item.id}`)}
							scopedSlots={{
								status: (item) => (
									<td>
										<CBadge color={getBadge(item.status)}>{item.status}</CBadge>
									</td>
								)
							}}
						/>
						<CPagination
							activePage={page}
							onActivePageChange={pageChange}
							pages={numPages}
							doubleArrows={false}
							align="center"
						/>
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default Users;
