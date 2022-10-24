import { getAttributes, isAnchorTag } from '@10up/headless-core';
import { BlocksRenderer, YoutubeLiteBlock, ImageBlock } from '@10up/headless-core/react';
import { TwitterBlock, ImageComponent } from '@10up/headless-next';
import { css } from '@linaria/core';

import PropTypes from 'prop-types';
import { Link } from './Link';

const LinkBlock = ({ domNode, children }) => {
	const { href, rel } = getAttributes(domNode.attribs);

	return (
		<Link href={href} rel={rel}>
			{children}
		</Link>
	);
};

LinkBlock.propTypes = {
	domNode: PropTypes.shape({
		attribs: PropTypes.shape({}).isRequired,
	}).isRequired,
	children: PropTypes.node.isRequired,
};

export const Blocks = ({ html }) => {
	return (
		<div
			className={css`
				position: relative;
			`}
		>
			<BlocksRenderer html={html}>
				<ImageBlock component={ImageComponent} />
				<LinkBlock test={(node) => isAnchorTag(node, { isInternalLink: true })} />
				<TwitterBlock />
				<YoutubeLiteBlock />
			</BlocksRenderer>
		</div>
	);
};

Blocks.propTypes = {
	html: PropTypes.string.isRequired,
};

export default Blocks;
