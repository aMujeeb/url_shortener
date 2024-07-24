const { GET } = require('./api/url/shorten'); // Import API route handler
const prisma = require('./prisma'); // Import your Prisma instance
const { createMocks } = require('node-mocks-http'); // For creating mock request and response objects

describe('Get Saved Shortened Urls route', () => {
    it('should return an array of items from data base', async () => {
        const { req, res } = createMocks();

        // Mocking Prisma's findMany method

        prisma.urlDetails.findMany.mockResolvedValue([
            { id: 22, original: 'https://examples123.456.com', shortened: 'sho.rt/3etetete', createddate: '2024-07-23 07:43:01.03', description: 'Decription 1' },
            { id: 23, original: 'https://examples789.123.com', shortened: 'sho.rt/3etyeyee', createddate: '2024-07-23 08:43:01.03', description: 'Decription 2' },
        ]);

        await GET(req, res);

        //check API return status
        expect(res._getStatusCode()).toBe(200);

        //Checking response data
        expect(JSON.parse(res._getData())).toEqual({
            data: [
                { id: 22, original: 'https://examples123.456.com', shortened: 'sho.rt/3etetete', createddate: '2024-07-23 07:43:01.03', description: 'Decription 1' },
                { id: 23, original: 'https://examples789.123.com', shortened: 'sho.rt/3etyeyee', createddate: '2024-07-23 08:43:01.03', description: 'Decription 2' }
            ],
        });
    });
});