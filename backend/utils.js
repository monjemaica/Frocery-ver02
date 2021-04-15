import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
	return jwt.sign(
		{
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		},
		process.env.JWT_SECRET || '@Coder_Secret_K3y',
		{
			expiresIn: '30d',
		}
	);
};

export const isAuth = (req, res, next) => {
	const authorization = req.headers.authorization;
	if (authorization) {
		const token = authorization.slice(7, authorization.length); // get rid of bearer and return token
		jwt.verify(
			token,
			process.env.JWT_SECRET || '@Coder_Secret_K3y',
			(err, decode) => {
				if (err) {
					req.status(401).send({ message: 'Invalid Token' });
				} else {
					req.user = decode;
					next();
				}
			}
		);
	} else {
		req.status(401).send({ message: 'No Token' });
	}
};
