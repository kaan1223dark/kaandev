"use client";
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, username }),
            });
            if (res.ok) {
                // Auto sign-in after registration
                await signIn('credentials', { redirect: true, email, password });
            } else {
                const body = await res.json();
                setError(body?.error || 'Registration failed');
            }
        } catch (e) {
            setError('Server error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full" />
                </div>
                {error && <div className="text-red-600">{error}</div>}
                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
}
