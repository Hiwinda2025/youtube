// 自动更新sitemap.xml中的日期
const fs = require('fs');
const path = require('path');

function updateSitemap() {
    const sitemapPath = path.join(__dirname, 'sitemap.xml');
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    try {
        let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
        
        // 替换所有的日期为当前日期
        sitemapContent = sitemapContent.replace(
            /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g,
            `<lastmod>${currentDate}</lastmod>`
        );
        
        // 如果需要更新域名，可以在这里替换
        // sitemapContent = sitemapContent.replace(
        //     /https:\/\/your-domain\.netlify\.app/g,
        //     'https://your-actual-domain.com'
        // );
        
        fs.writeFileSync(sitemapPath, sitemapContent);
        console.log(`✅ Sitemap updated successfully! Date: ${currentDate}`);
        
    } catch (error) {
        console.error('❌ Error updating sitemap:', error.message);
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    updateSitemap();
}

module.exports = updateSitemap; 