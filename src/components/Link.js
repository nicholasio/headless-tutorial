import PropTypes from 'prop-types';
import { removeSourceUrl } from '@10up/headless-core';
import { useSettings } from '@10up/headless-core/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export const Link = ({ href, rel, children }) => {
	const { query } = useRouter();

	const settings = useSettings();
	const link = removeSourceUrl({ link: href, backendUrl: settings.sourceUrl || '' });

	const isSpaNavigation = query?.navigation === 'spa' || typeof query.navigation === 'undefined';

	if (isSpaNavigation) {
		return (
			<NextLink href={link}>
				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				<a rel={rel}>{children}</a>
			</NextLink>
		);
	}

	return (
		<a href={link} rel={rel}>
			{children}
		</a>
	);
};

Link.propTypes = {
	href: PropTypes.string.isRequired,
	rel: PropTypes.string,
	children: PropTypes.node.isRequired,
};

Link.defaultProps = {
	rel: '',
};
