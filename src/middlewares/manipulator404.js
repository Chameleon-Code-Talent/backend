function manipulator404(req, res, next) {
    res.status(404).json({ message: "Page not found", status: 404 });
}

export default manipulator404;