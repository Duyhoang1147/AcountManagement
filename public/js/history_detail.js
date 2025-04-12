async function getUserid() {
    const response = await fetch('/auth/me', {
        method: 'GET',
        credentials: 'include' // Gửi cookie kèm request
    });

    if(response.ok) {
        const data = await response.json();
        console.log(data.user._id)
        return data.user._id
    }
}

function getStoryid() {
    const pathSegments = window.location.pathname.split('/');
    const storyId = pathSegments[pathSegments.length - 1];
    return storyId
}

async function updateHistory() {
    if(!await getUserid()) {
        console.log('User not logged in')
        return
    }
    console.log('start history')
    const responseCheck = await fetch(`http://localhost:8080/history/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userid: await getUserid(), storyid: getStoryid() })
    });

    if(responseCheck.ok) {
        console.log('start update')
        const responseUpdate = await fetch(`http://localhost:8080/history/`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userid: await getUserid(), storyid: getStoryid() })
        })

        if(responseUpdate.ok) {
            console.log('Update history successfully')
        } else {
            console.log('Failed to update history')
        }
        
    } else {
        console.log('start create')
        const responseCreate = await fetch(`http://localhost:8080/history/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userid: await getUserid(), storyid: getStoryid() })
        })

        if(responseCreate.ok) {
            console.log('Create history successfully')
        } else {
            console.log('Failed to create history')
        }
    }
}

updateHistory();