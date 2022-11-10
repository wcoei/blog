import config from '../../template-config'

export const convertImageUrl = (content: string) => {
    if (!config.S3_URL
        || !config.CLOUDFRONT_URL
        || config.S3_URL === ''
        || config.CLOUDFRONT_URL === ''
    ) {
        return content;
    }         
    
    return content.replace(config.S3_URL, config.CLOUDFRONT_URL);
}