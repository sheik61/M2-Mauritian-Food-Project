from scraper import GoogleImageScraper
import os

if __name__ == '__main__':
    scraper = GoogleImageScraper()
    # By default, directory='images' and amount='50'
    search_terms = ['chicken briyani']
    
    for search_term in search_terms:
        dir_name = search_term.strip()
        
        if not os.path.exists(dir_name):
            os.makedirs(dir_name)
            
        scraper.downloadImages(query=search_term, directory=dir_name, amount=10)
