exports.heartbeat = async (req, res) => {
    try {
        const { hostname, user } = req.body;

        console.log('Heartbeat received:', {
            hostname,
            user,
            time: new Date()
        });

        return res.json({
            success: true,
            message: 'Heartbeat received'
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false });
    }
};

