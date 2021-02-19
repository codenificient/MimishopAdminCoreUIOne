import React, { useEffect, useState } from 'react';
import { IoIosArrowDown, IoMdSearch } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, signout, signup as _signup } from '../../actions';
import flipkartLogo from '../../images/shopLogo7.png';
import { DropdownMenu, MaterialButton, MaterialInput, Modal } from '../MaterialUI';
import SearchBox from '../SearchBox';
import Cart from '../UI/Cart';
import './style.css';

const Header = (props) => {
	const [ loginModal, setLoginModal ] = useState(false);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ signup, setSignup ] = useState(false);
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ error, setError ] = useState('');
	const [ searchField, setSearchField ] = useState('');

	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const cart = useSelector((state) => state.cart);
	

	const cancelLogin = () => {
		setEmail('');
		setPassword('');
		setLoginModal(false);
	};



	const handleChange = (e) => setSearchField({ searchField: e.target.value });

	const handleSearch = () => { }
	// 	const someProducts = product.allProducts.filter((item) => item.name.toLowerCase().includes(searchField.toLowerCase()));
	// 	setFilteredProducts(someProducts)
	// }


	// console.log({ filteredProducts });

	const userSignup = () => {
		const user = { firstName, lastName, email, password };
		if (firstName === '' || lastName === '' || email === '' || password === '') {
			return;
		}
		dispatch(_signup(user));
	};

	const userLogin = () => {
		if (signup) {
			userSignup();
		}
		dispatch(login({ email, password }));
	};

	const userLogout = () => {
		dispatch(signout());
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
					{ label: 'Mon Profile', href: '', icon: null },
					{ label: 'SuperCoin Zone', href: '', icon: null },
					{
						label: 'Achats',
						href: `/account/orders`,
						icon: null,
						onclick: () => {
							!auth.authenticate && setLoginModal(true);
						}
					},
					{ label: 'Souhaits', href: '', icon: null },
					{ label: 'Mes Chats', href: '', icon: null },
					{ label: 'Récompenses', href: '', icon: null },
					{ label: 'Cadeaux', href: '', icon: null },
					{ label: 'Déconnecter', href: '', icon: null, onClick: userLogout }
				]}

			/>
		);
	};
	const renderNonLoggedInMenu = () => {
		return (
			<DropdownMenu
				menu={
					<Link
						className="loginButton"
						style={{ color: '#177c7c', minWidth: '130px' }}
						onClick={() => {
							setLoginModal(true);
							setSignup(false);
						}}
					>
						Connection
					</Link>
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
						label: 'Achats',
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
						<span>Nouveau Client?</span>
						<Link
							onClick={() => {
								setLoginModal(true);
								setSignup(true);
							}}
						>
							Créer compte
						</Link>
					</div>
				}
			/>
		);
	};

	return (
		// header starts here
		<div className="header"
		>
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
								{signup && (
									<MaterialInput
										type="text"
										label="Votre prénom"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
									/>
								)}

								{signup && (
									<MaterialInput
										type="text"
										label="Votre nom"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
									/>
								)}

								<MaterialInput
									type="text"
									label="Email ou Numéro Mobile"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>

								<MaterialInput
									type="password"
									label="Votre Mot de Passe"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								{/* rightElement={<a href="#">Forgot?</a>} */}
								<MaterialButton
									title={signup ? 'Créer nouveau Compte' : 'Se connecter'}
									bgColor="rgb(23, 124, 124)"
									textColor="#fff"
									style={{ marginTop: '50px', borderRadius: '30px' }}
									onClick={userLogin}
								/>

								<p style={{ textAlign: 'center', margin: '10px 0' }}>OU</p>
								<MaterialButton
									title="Recevoir code par SMS"
									bgColor="rgb(235, 235, 235)"
									textColor="rgb(23, 124, 124)"
									style={{ marginTop: '25px', borderRadius: '30px' }}
								/>
							</div>
						</div>
					</div>
				</div>
			</Modal>

			{/* subheader begins here */}
			<div className="subHeader">
				<div className="logo">
					<a href="/">
						<img src={flipkartLogo} className="logoimage" alt="" />
					</a>
					{/* <a style={{ marginTop: '-10px' }}>
						<span className="exploreText">Explore</span>
						<span className="plusText">Plus</span>
						<img src={goldenStar} className="goldenStar" alt="" />
					</a> */}
				</div>
		
				{/* side header ends here */}
				<SearchBox
					handleChange={handleChange}
					handleSearch={handleSearch}
				/>
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
							{/* <IoIosCart />
							 */}
							<Cart count={Object.keys(cart.cartItems).length} />
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
