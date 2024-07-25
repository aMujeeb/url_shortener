import { NextRequest } from 'next/server';
import { GET } from './route';
import { PrismaClient } from "@prisma/client";
import '@testing-library/jest-dom'

const prisma = new PrismaClient();

// Successfully retrieves the original URL when a valid shortened URL is provided
it('should return the original URL when a valid shortened URL is provided', async () => {
    const req = {
        nextUrl: {
            searchParams: {
                get: jest.fn().mockReturnValue('example.com/abc')
            }
        }
    } as unknown as NextRequest;

    const mockResponse = {
        json: jest.fn(),
    };

    const mockUrlDetails = { original: 'http://original-url.com' };
    prisma.urlDetails.findFirst = jest.fn().mockResolvedValue(mockUrlDetails);

    const response = await GET(req);
    const jsonResponse = await response.json();

    expect(prisma.urlDetails.findFirst).toHaveBeenCalledWith({
        where: {
            shortened: {
                equals: 'validShortUrl'
            }
        }
    });
    expect(jsonResponse).toEqual({ data: 'http://original-url.com', status_code: 201 });
});

it('Returning an error message when an invalid short URL is provided', async () => {
    const mockRequest = {
        nextUrl: {
            searchParams: {
                get: jest.fn().mockReturnValue('sgtsrgteryter'), // Invalid short URL
            },
        },
    } as unknown as NextRequest;

    const mockResponse = {
        json: jest.fn(),
    };

    // Call the GET function
    await GET(mockRequest);

    // Verify that json method was called with the correct error message
    expect(mockResponse.json).toHaveBeenCalledWith({
        data: 'Not Available or Unknown error. Please try again.',
        status_code: 401,
    });
});

it('Returning an error message when an exception occurs', async () => {
    const mockRequest = {
        nextUrl: {
            searchParams: {
                get: jest.fn().mockReturnValue('example.com/abc'),
            },
        },
    } as unknown as NextRequest;

    const mockResponse = {
        json: jest.fn(),
    };

    // Mocking for a DB exception (e.g., database error)
    jest.spyOn(prisma.urlDetails, 'findFirst').mockRejectedValue(new Error('Database error'));

    // Call the GET function
    await GET(mockRequest);

    // Verify that json method was called with the correct error message
    expect(mockResponse.json).toHaveBeenCalledWith({
        data: 'Error. Please Try Again',
    });
});

