import React, { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosCart, IoMdSearch } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { login, signout } from '../../actions';
import flipkartLogo from '../../images/shopLogo7.png';
import { DropdownMenu, MaterialButton, MaterialInput, Modal } from '../MaterialUI';
import './style.css';

/**
* @author
* @function Header
**/

const Header = (props) => {
	const [ loginModal, setLoginModal ] = useState(false);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const cancelLogin = () => {
		setEmail('');
		setPassword('');
		setLoginModal(false);
	};

	const userLogin = () => {
		dispatch(login({ email, password }));
	};
	const userLogout = () => {
		dispatch(signout());
	};

	const userOrders = () => {
		props.history.push(`/accout/orders`);
	};

	useEffect(
		() => {
			if (auth.authenticate) {
				setLoginModal(false);
			}
		},
		[ auth.authenticate ]
	);

	const renderLoggedInMenu = () => {
		return (
			<DropdownMenu
				menu={
					<a>
						<span className="fullName">{auth.user.fullName}</span>
					</a>
				}
				menus={[
					{ label: 'My Profile', href: '', icon: null },
					{ label: 'SuperCoin Zone', href: '', icon: null },
					{ label: 'Flipkart Plus Zone', href: '', icon: null },
					{
						label: 'Orders',
						href: `/account/orders`,
						icon: null,
						onclick: () => {
							!auth.authenticate && setLoginModal(true);
						}
					},
					{ label: 'Wishlist', href: '', icon: null },
					{ label: 'My Chats', href: '', icon: null },
					{ label: 'Rewards', href: '', icon: null },
					{ label: 'Coupons', href: '', icon: null },
					{ label: 'Gift Cards', href: '', icon: null },
					{ label: 'Logout', href: '', icon: null, onClick: userLogout }
				]}
				firstMenu={
					<div className="firstmenu">
						<span>New Customer?</span>
						<a style={{ color: '#2874f0' }}>Sign Up</a>
					</div>
				}
			/>
		);
	};
	const renderNonLoggedInMenu = () => {
		return (
			<DropdownMenu
				menu={
					<a className="loginButton" style={{ color: '#177c7c' }} onClick={() => setLoginModal(true)}>
						Connection
					</a>
				}
				menus={[
					{
						label: 'Mon Profile',
						href: `/account/profile`,
						icon: null,
						onClick: () => {
							!auth.authenticate && setLoginModal(true);
						}
					},
					{
						label: 'Commandes',
						href: `/account/orders`,
						icon: null,
						onClick: () => {
							!auth.authenticate && setLoginModal(true);
						}
					},
					{ label: 'Zone VIP', href: '', icon: null },
					{ label: 'Liste de Souhaits', href: '', icon: null },
					{ label: 'Récompenses', href: '', icon: null },
					{ label: 'Bons et Cadeaux', href: '', icon: null }
				]}
				firstMenu={
					<div className="firstmenu">
						<span style={{ color: '#177c7c', fontSize: '14px' }}>Nouveau Client?</span>
						<a style={{ color: '#177c7c', fontSize: '14px', fontWeight: '600' }}>Créer un compte</a>
					</div>
				}
			/>
		);
	};

	return (
		// header starts here
		<div className="header">
			<Modal visible={loginModal} onClose={cancelLogin}>
				<div className="authContainer">
					<div className="row">
						<div className="leftspace">
							<h2 className="baisser">Connectez vous</h2>
							<p className="baisser">
								Gagnez access à vos Commandes, Liste de Souhaits et Récommendations
							</p>
						</div>
						<div className="rightspace">
							<div className="loginInputContainer">
								<MaterialInput
									type="text"
									label="Email ou Numéro de Telephone"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>

								<MaterialInput
									type="password"
									label="Votre Mot de Passe"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									rightElement={<a href="#">Forgot?</a>}
								/>
								<MaterialButton
									title="Se connecter"
									bgColor="rgb(23, 124, 124)"
									textColor="#fff"
									style={{ margin: '40px 0 20px 0', borderRadius: '30px' }}
									onClick={userLogin}
								/>

								<p style={{ textAlign: 'center' }}>OU</p>
								<MaterialButton
									title="Recevoir code par SMS"
									bgColor="rgb(235, 235, 235)"
									textColor="rgb(23, 124, 124)"
									style={{ margin: '20px 0', borderRadius: '30px' }}
								/>
							</div>
						</div>
					</div>
				</div>
			</Modal>

			{/* subheader begins here */}
			<div className="subHeader">
				<div className="logo">
					<a href="">
						<img src={flipkartLogo} className="logoimage" alt="" />
					</a>
					{/* <a style={{ marginTop: '-10px' }}>
						<span className="exploreText">Explore</span>
						<span className="plusText">Plus</span>
						<img src={goldenStar} className="goldenStar" alt="" />
					</a> */}
				</div>
				<div
					style={{
						padding: '0 10px'
					}}
				>
					<div className="searchInputContainer">
						<input className="searchInput" placeholder={'search for products, brands and more'} />
						<div className="searchIconContainer">
							<IoMdSearch
								style={{
									color: 'rgb(7,155,155)',
									width: '30px',
									height: '30px'
								}}
							/>
						</div>
					</div>
				</div>
				{/* side header ends here */}

				{/* right side menu starts here */}
				<div className="rightMenu">
					{auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
					<DropdownMenu
						menu={
							<a className="more">
								<span>Divers</span>
								<IoIosArrowDown />
							</a>
						}
						menus={[
							{ label: 'Préferences de Notifications', href: '', icon: null },
							{ label: 'Vendre sur MimiShop', href: '', icon: null },
							{ label: 'Service Client 24x7', href: '', icon: null },
							{ label: 'Annonces et Publicités', href: '', icon: null },
							{ label: 'Application MimiShop', href: '', icon: null }
						]}
					/>
					<div>
						<a href={`/cart`} className="cart">
							<IoIosCart />
							<span className="pannier" style={{ margin: '0 10px' }}>
								Pannier
							</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
