import { useState } from 'react';
import {
	Card,
	Heading,
	TextContainer,
	DisplayText,
	TextStyle,
} from '@shopify/polaris';

export function ProductsCard() {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<>
			<Card
				title='Product Counter'
				sectioned
				primaryFooterAction={{
					content: 'Populate 5 products',
					onAction: handlePopulate,
					loading: isLoading,
				}}
			>
				<TextContainer spacing='loose'>
					<p>
						Sample products are created with a default title and price. You can
						remove them at any time.
					</p>
					<Heading element='h4'>
						TOTAL PRODUCTS
						<DisplayText size='medium'>
							<TextStyle variation='strong'>
								{isLoadingCount ? '-' : data.count}
							</TextStyle>
						</DisplayText>
					</Heading>
				</TextContainer>
			</Card>
		</>
	);
}
