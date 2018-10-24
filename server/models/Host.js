const mongoose = require('mongoose')

const hostSchema = new mongoose.Schema({
    hostName: String,
    hostType: String,
    country: String,
    town: String,
    address: String,
    description: String,
    rooms: Number,
    hostImg: {
        data: Buffer,
        ontentType: String,
        default: ''}
})

hostSchema.statics.format = (host) => {
    return {
        id: host.id,
        hostName: host.hostName,
        hostType: host.hostType,
        country: host.country,
        town: host.town,
        address: host.address,
        description: host.description,
        rooms: host.rooms,
        hostImg: host.hostImg
    }
}

const Host = mongoose.model('Host', hostSchema);

module.exports = Host