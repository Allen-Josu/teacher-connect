import { useState } from 'react';



export default function TeacherInteractive() {
    const [activeTab, setActiveTab] = useState('messages');
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const teachers = [
        { id: 1, name: 'Dr. Sarah Johnson', subject: 'Mathematics', avatar: 'SJ', status: 'online', lastMessage: 'Thanks for sharing those resources!', time: '2m ago', unread: 2 },
        { id: 2, name: 'Prof. Michael Chen', subject: 'Physics', avatar: 'MC', status: 'online', lastMessage: 'Can we discuss the lab schedule?', time: '15m ago', unread: 0 },
        { id: 3, name: 'Ms. Emily Rodriguez', subject: 'Chemistry', avatar: 'ER', status: 'away', lastMessage: 'The experiment results look great', time: '1h ago', unread: 1 },
        { id: 4, name: 'Mr. David Kumar', subject: 'Biology', avatar: 'DK', status: 'offline', lastMessage: 'See you at the meeting', time: '3h ago', unread: 0 },
        { id: 5, name: 'Dr. Lisa Anderson', subject: 'English', avatar: 'LA', status: 'online', lastMessage: 'I loved your presentation today', time: '5h ago', unread: 0 },
    ];

    const messages = [
        { id: 1, sender: 'them', text: 'Hi! I was reviewing the curriculum for next semester.', time: '10:30 AM' },
        { id: 2, sender: 'me', text: 'Great! What changes are you thinking about?', time: '10:32 AM' },
        { id: 3, sender: 'them', text: 'I think we should add more practical sessions for students.', time: '10:35 AM' },
        { id: 4, sender: 'me', text: 'That sounds excellent. We could coordinate lab times together.', time: '10:37 AM' },
        { id: 5, sender: 'them', text: 'Perfect! Let me know when you\'re free this week.', time: '10:40 AM' },
    ];

    const forums = [
        { id: 1, title: 'Teaching Strategies for Remote Learning', author: 'Dr. Sarah Johnson', replies: 24, likes: 45, time: '2h ago', category: 'Pedagogy' },
        { id: 2, title: 'Best Practices for Student Engagement', author: 'Prof. Michael Chen', replies: 18, likes: 32, time: '5h ago', category: 'Discussion' },
        { id: 3, title: 'Sharing Assessment Templates', author: 'Ms. Emily Rodriguez', replies: 12, likes: 28, time: '1d ago', category: 'Resources' },
        { id: 4, title: 'Interdisciplinary Project Ideas', author: 'Mr. David Kumar', replies: 31, likes: 56, time: '2d ago', category: 'Collaboration' },
    ];

    const events = [
        { id: 1, title: 'Department Meeting', date: 'Oct 15, 2025', time: '10:00 AM', attendees: 12, type: 'meeting' },
        { id: 2, title: 'Workshop: Modern Teaching Tools', date: 'Oct 18, 2025', time: '2:00 PM', attendees: 25, type: 'workshop' },
        { id: 3, title: 'Curriculum Review Session', date: 'Oct 22, 2025', time: '11:00 AM', attendees: 8, type: 'review' },
    ];

    const handleSendMessage = () => {
        if (messageText.trim()) {
            setMessageText('');
        }
    };

    const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500">
            {/* Header */}
            <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">TC</span>
                            </div>
                            <div>
                                <h1 className="text-white font-bold text-xl">TeacherConnect</h1>
                                <p className="text-white/80 text-sm">Faculty Collaboration Hub</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="text-white/80 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button>
                            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tab Navigation */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl mb-6">
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('messages')}
                            className={`flex-1 px-6 py-4 text-center font-medium transition-all ${activeTab === 'messages'
                                ? 'text-violet-600 border-b-2 border-violet-600 bg-violet-50'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <span>Messages</span>
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('forum')}
                            className={`flex-1 px-6 py-4 text-center font-medium transition-all ${activeTab === 'forum'
                                ? 'text-violet-600 border-b-2 border-violet-600 bg-violet-50'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                </svg>
                                <span>Forum</span>
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('events')}
                            className={`flex-1 px-6 py-4 text-center font-medium transition-all ${activeTab === 'events'
                                ? 'text-violet-600 border-b-2 border-violet-600 bg-violet-50'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Events</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Messages Tab */}
                {activeTab === 'messages' && (
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-3 h-[600px]">
                            {/* Teacher List */}
                            <div className="border-r border-gray-200 overflow-y-auto">
                                <div className="p-4 border-b border-gray-200 bg-gray-50">
                                    <input
                                        type="text"
                                        placeholder="Search colleagues..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {filteredTeachers.map((teacher) => (
                                        <button
                                            key={teacher.id}
                                            onClick={() => setSelectedTeacher(teacher)}
                                            className={`w-full p-4 flex items-start space-x-3 hover:bg-gray-50 transition-colors ${selectedTeacher?.id === teacher.id ? 'bg-violet-50' : ''
                                                }`}
                                        >
                                            <div className="relative">
                                                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center text-white font-bold">
                                                    {teacher.avatar}
                                                </div>
                                                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${teacher.status === 'online' ? 'bg-green-500' : teacher.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                                                    }`} />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
                                                    <span className="text-xs text-gray-500">{teacher.time}</span>
                                                </div>
                                                <p className="text-sm text-gray-600">{teacher.subject}</p>
                                                <p className="text-sm text-gray-500 truncate">{teacher.lastMessage}</p>
                                            </div>
                                            {teacher.unread > 0 && (
                                                <div className="w-5 h-5 bg-violet-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                    {teacher.unread}
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Chat Area */}
                            <div className="lg:col-span-2 flex flex-col">
                                {selectedTeacher ? (
                                    <>
                                        <div className="p-4 border-b border-gray-200 bg-gray-50">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center text-white font-bold">
                                                    {selectedTeacher.avatar}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{selectedTeacher.name}</h3>
                                                    <p className="text-sm text-gray-600">{selectedTeacher.subject}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                                            {messages.map((message) => (
                                                <div
                                                    key={message.id}
                                                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div
                                                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${message.sender === 'me'
                                                            ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white'
                                                            : 'bg-white text-gray-800 shadow-sm'
                                                            }`}
                                                    >
                                                        <p className="text-sm">{message.text}</p>
                                                        <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-white/80' : 'text-gray-500'}`}>
                                                            {message.time}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-4 border-t border-gray-200 bg-white">
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    placeholder="Type a message..."
                                                    value={messageText}
                                                    onChange={(e) => setMessageText(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                                />
                                                <button
                                                    onClick={handleSendMessage}
                                                    className="px-6 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg hover:shadow-lg transition-all"
                                                >
                                                    Send
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center text-gray-500">
                                        <div className="text-center">
                                            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            <p className="text-lg">Select a colleague to start chatting</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Forum Tab */}
                {activeTab === 'forum' && (
                    <div className="space-y-6">
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Discussion Forum</h2>
                                <button className="px-6 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg hover:shadow-lg transition-all">
                                    New Topic
                                </button>
                            </div>
                            <div className="space-y-4">
                                {forums.map((forum) => (
                                    <div
                                        key={forum.id}
                                        className="p-6 border border-gray-200 rounded-xl hover:shadow-md hover:border-violet-300 transition-all cursor-pointer"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <span className="inline-block px-3 py-1 text-xs font-semibold text-violet-600 bg-violet-100 rounded-full mb-2">
                                                    {forum.category}
                                                </span>
                                                <h3 className="text-lg font-semibold text-gray-900 hover:text-violet-600 transition-colors">
                                                    {forum.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-1">Started by {forum.author}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                </svg>
                                                <span>{forum.replies} replies</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                                <span>{forum.likes} likes</span>
                                            </div>
                                            <span>{forum.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Events Tab */}
                {activeTab === 'events' && (
                    <div className="space-y-6">
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
                                <button className="px-6 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg hover:shadow-lg transition-all">
                                    Create Event
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {events.map((event) => (
                                    <div
                                        key={event.id}
                                        className="p-6 border-2 border-gray-200 rounded-xl hover:border-violet-500 hover:shadow-lg transition-all cursor-pointer"
                                    >
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${event.type === 'meeting' ? 'bg-blue-100' :
                                            event.type === 'workshop' ? 'bg-green-100' : 'bg-orange-100'
                                            }`}>
                                            <svg className={`w-6 h-6 ${event.type === 'meeting' ? 'text-blue-600' :
                                                event.type === 'workshop' ? 'text-green-600' : 'text-orange-600'
                                                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>{event.date}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>{event.time}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                                <span>{event.attendees} attending</span>
                                            </div>
                                        </div>
                                        <button className="w-full mt-4 px-4 py-2 bg-violet-50 text-violet-600 font-medium rounded-lg hover:bg-violet-100 transition-colors">
                                            Join Event
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
}

