export const api = 'http://localhost:2000/api';
export const generatePublicUrl = (filename) => {
	return `http://localhost:2000/public/${filename}`;
};

export const formatter = new Intl.NumberFormat('fr-FR', {
	style: 'currency',
	currency: 'XOF',
	minimumFractionDigits: 0
});
