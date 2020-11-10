import React from 'react';
import {render, waitFor, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import {data} from '../data/mockData'
import {fetchShows as mockFetchShows} from '../api/fetchShow'

jest.mock('../api/fetchShow')
console.log(mockFetchShows)

test('successfully renders data from api', async () => {
    mockFetchShows.mockResolvedValueOnce(data)
    //render app
    render(<App />)
    const dropDown = await screen.findByText(/select a season/i)
    userEvent.click(dropDown)
    const season1 = await screen.findByText(/season 1/i)
    userEvent.click(season1)
    //component waits for API then renders data thats returned
    waitFor(() => {
        expect(screen.queryAllByTestId(/episode/i)).toHaveLength(8)
    })
})