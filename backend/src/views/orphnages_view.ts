import Orphnage from '../models/Orphnage'
import imagesView from './images_view'

export default {
    render(orphnage: Orphnage) {
        return {
            id: orphnage.id,
            name: orphnage.name,
            latitude: orphnage.latitude,
            longitude: orphnage.longitude,
            about: orphnage.about,
            instructions: orphnage.instructions,
            opening_hours: orphnage.opening_hours,
            open_on_weekends: orphnage.open_on_weekends,
            images: imagesView.renderMany(orphnage.images)
        };
    },

    renderMany(orphnages: Orphnage[]) {
        return orphnages.map(orphnage => this.render(orphnage));
    }
};