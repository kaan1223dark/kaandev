"use client";
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await signIn('credentials', { redirect: false, email, password });
            if (res?.ok) {
                // redirect to home
                window.location.href = '/';
            } else {
                setError((res as any)?.error || 'Login failed');
            }
        } catch (e) {
            setError('Server error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full" />
                </div>
                {error && <div className="text-red-600">{error}</div>}
                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>
            </form>
        </div>
    );
}
