/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { colors } from '../../constants/colors'
import { Category, Videos } from '../'
import { ApiService } from '../../service/api.service'

const Main = () => {
	const [selectedCategory, setSelectedCategory] = useState('New')
	const [videos, setVideos] = useState([])

	const selectedCategoryHandler = category => setSelectedCategory(category)

	useEffect(() => {
		ApiService.fetching(`search?part=snippet&q=${selectedCategory}`).then(
			data => setVideos(data.items)
		)
	}, [selectedCategory])

	return (
		<Stack>
			<Category
				selectedCategoryHandler={selectedCategoryHandler}
				selectedCategory={selectedCategory}
			/>
			<Box p={2} sx={{ height: '90vh' }}>
				<Container maxWidth={'90%'}>
					<Typography variant='h4' fontWeight={'bold'} mb={2}>
						{selectedCategory}{' '}
						<span style={{ color: colors.secondary }}>videos</span>
					</Typography>
					<Videos videos={videos} />
				</Container>
			</Box>
		</Stack>
	)
}

export default Main
