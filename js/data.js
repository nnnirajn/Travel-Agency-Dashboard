const monthlyRevenue = [
    { label: 'Jan', value: 42 }, { label: 'Feb', value: 58 }, { label: 'Mar', value: 45 },
    { label: 'Apr', value: 72 }, { label: 'May', value: 68 }, { label: 'Jun', value: 85 },
    { label: 'Jul', value: 92 }, { label: 'Aug', value: 78 }, { label: 'Sep', value: 65 },
    { label: 'Oct', value: 88 }, { label: 'Nov', value: 95 }, { label: 'Dec', value: 110 },
];

const weeklyRevenue = [
    { label: 'W1', value: 22 }, { label: 'W2', value: 28 }, { label: 'W3', value: 35 }, { label: 'W4', value: 30 },
];

const upcomingTours = [
    { name: 'Bali Paradise Escape', date: 'Jun 15', travelers: 12, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=100&h=100&fit=crop' },
    { name: 'Swiss Alps Adventure', date: 'Jun 18', travelers: 8, image: 'https://images.unsplash.com/photo-1531366936337-7a912a4589a7?w=100&h=100&fit=crop' },
    { name: 'Tokyo City Lights', date: 'Jun 22', travelers: 15, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop' },
    { name: 'Santorini Sunset Tour', date: 'Jun 25', travelers: 6, image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=100&h=100&fit=crop' },
];

const bookings = [
    { id: 'BK-1042', client: 'Emma Wilson', email: 'emma.w@email.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=72&h=72&fit=crop&crop=face', destination: 'Paris, France', flag: '🇫🇷', date: 'Jun 12, 2026', amount: '$2,450', status: 'confirmed' },
    { id: 'BK-1041', client: 'James Rodriguez', email: 'j.rodriguez@email.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=72&h=72&fit=crop&crop=face', destination: 'Maldives', flag: '🇲🇻', date: 'Jun 11, 2026', amount: '$5,800', status: 'pending' },
    { id: 'BK-1040', client: 'Sophie Laurent', email: 's.laurent@email.com', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=72&h=72&fit=crop&crop=face', destination: 'Rome, Italy', flag: '🇮🇹', date: 'Jun 10, 2026', amount: '$1,920', status: 'confirmed' },
    { id: 'BK-1039', client: 'Michael Chen', email: 'm.chen@email.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=72&h=72&fit=crop&crop=face', destination: 'Dubai, UAE', flag: '🇦🇪', date: 'Jun 9, 2026', amount: '$3,150', status: 'confirmed' },
    { id: 'BK-1038', client: 'Olivia Park', email: 'o.park@email.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=72&h=72&fit=crop&crop=face', destination: 'Barcelona, Spain', flag: '🇪🇸', date: 'Jun 8, 2026', amount: '$1,680', status: 'cancelled' },
    { id: 'BK-1037', client: 'David Kumar', email: 'd.kumar@email.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=72&h=72&fit=crop&crop=face', destination: 'Kyoto, Japan', flag: '🇯🇵', date: 'Jun 7, 2026', amount: '$3,420', status: 'confirmed' },
    { id: 'BK-1036', client: 'Anna Müller', email: 'a.muller@email.com', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=72&h=72&fit=crop&crop=face', destination: 'Santorini, Greece', flag: '🇬🇷', date: 'Jun 6, 2026', amount: '$2,890', status: 'pending' },
];

const destinations = [
    { name: 'Santorini', country: 'Greece', bookings: 156, rating: 4.9, price: '$1,200', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=300&fit=crop' },
    { name: 'Kyoto', country: 'Japan', bookings: 134, rating: 4.8, price: '$1,450', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop' },
    { name: 'Amalfi Coast', country: 'Italy', bookings: 98, rating: 4.7, price: '$1,350', image: 'https://images.unsplash.com/photo-1534113414501-b69338978147?w=400&h=300&fit=crop' },
    { name: 'Bali', country: 'Indonesia', bookings: 187, rating: 4.9, price: '$980', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop' },
    { name: 'Paris', country: 'France', bookings: 142, rating: 4.8, price: '$1,100', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop' },
    { name: 'Maldives', country: 'Maldives', bookings: 89, rating: 4.9, price: '$2,400', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=300&fit=crop' },
];

const clients = [
    { name: 'Emma Wilson', email: 'emma.w@email.com', phone: '+1 555-0142', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face', bookings: 5, spent: '$12,400', lastTrip: 'Paris, France', status: 'active' },
    { name: 'James Rodriguez', email: 'j.rodriguez@email.com', phone: '+1 555-0198', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face', bookings: 3, spent: '$18,200', lastTrip: 'Maldives', status: 'active' },
    { name: 'Sophie Laurent', email: 's.laurent@email.com', phone: '+33 6 12 34 56', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face', bookings: 7, spent: '$9,850', lastTrip: 'Rome, Italy', status: 'active' },
    { name: 'Michael Chen', email: 'm.chen@email.com', phone: '+86 138 0000 0000', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face', bookings: 4, spent: '$14,600', lastTrip: 'Dubai, UAE', status: 'active' },
    { name: 'Olivia Park', email: 'o.park@email.com', phone: '+82 10 1234 5678', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face', bookings: 2, spent: '$4,200', lastTrip: 'Barcelona, Spain', status: 'inactive' },
    { name: 'David Kumar', email: 'd.kumar@email.com', phone: '+91 98 7654 3210', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face', bookings: 6, spent: '$16,800', lastTrip: 'Kyoto, Japan', status: 'active' },
];

const reports = [
    { title: 'Monthly Revenue Report', date: 'Jun 1, 2026', type: 'Financial', size: '2.4 MB', status: 'ready' },
    { title: 'Booking Summary — May 2026', date: 'May 31, 2026', type: 'Bookings', size: '1.1 MB', status: 'ready' },
    { title: 'Client Activity Overview', date: 'May 28, 2026', type: 'Clients', size: '890 KB', status: 'ready' },
    { title: 'Destination Performance Q2', date: 'May 25, 2026', type: 'Analytics', size: '3.2 MB', status: 'ready' },
    { title: 'Pending Inquiries Report', date: 'Jun 8, 2026', type: 'Operations', size: '540 KB', status: 'processing' },
];
