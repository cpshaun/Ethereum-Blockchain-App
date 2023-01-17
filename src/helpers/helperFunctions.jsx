export function truncate(hash,n){
    return (hash.length > n) ? hash.slice(0,n-1) + '...' : hash;
}