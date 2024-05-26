import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'alpostel.s3.amazonaws.com',
            'alpostel.s3.us-east-2.amazonaws.com'
        ],
    },
};
 
export default withNextIntl(nextConfig);
