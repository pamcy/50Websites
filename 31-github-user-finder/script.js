$(document).ready(function () {
    $('#inputSearch').on('keyup', function (e) {
        const userName = e.target.value

        // Make requests to Github
        $.ajax({
            url: `https://api.github.com/users/${userName}`,
            data: {
                client_id: 'd6d4293aa9734c25f08d',
                client_secret: '9cfc159a0959e30833bd15da856740150b35d5ee',
            },
        }).done(function (user) {
            $.ajax({
                url: `https://api.github.com/users/${userName}/repos`,
                data: {
                    client_id: 'd6d4293aa9734c25f08d',
                    client_secret: '9cfc159a0959e30833bd15da856740150b35d5ee',
                    sort: 'created: asc',
                    per_page: 8,
                },
            }).done(function (repos) {
                // loop through the array from github's repos and print out each object
                $.each(repos, function (index, repo) {
                    $('.github-repos').append(`
                        <div class="well">
                            <div class="row">
                                <div class="col-sm-7">
                                    <div class="github-repos-title">
                                        <h3><a href="${repo.svn_url}" target="_blank">${repo.name}</a></h3>
                                        <p>${repo.description}</p>
                                    </div>
                                </div>
                                <div class="col-sm-2">
                                    <span class="label label-warning">${repo.language}</span>
                                </div>
                                <div class="col-sm-3">
                                    <ul class="list-inline">
                                        <div class="github-repos-info">
                                            <li><i class="fa fa-code-fork"></i> Forks: ${repo.forks_count}</li>
                                            <li><i class="fa fa-star"></i> Stars: ${repo.stargazers_count}</li>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    `)
                })
            })

            $('.github-profiles').html(`
                <div class="row">
                    <div class="col-sm-3">
                        <img src="${user.avatar_url}" class="thumbnail">
                        <button type="button" class="btn btn-primary btn-block"><a href="${user.html_url}" target="blank">View Profile</a></button>
                    </div>
                    <div class="col-sm-9">
                        <div class="github-profiles-labels">
                            <span class="label label-default">Repositories: ${user.public_repos}</span>
                            <span class="label label-default">Gists: ${user.public_gists}</span>
                            <span class="label label-default">Followers: ${user.followers}</span>
                            <span class="label label-default">Following: ${user.following}</span>
                        </div>
                        <ul class="list-unstyled">
                            <h2>${user.name}</h2>
                            <blockquote><p>${user.bio}</p></blockquote>
                            <li>Location: ${user.location}</li>
                            <li>Company: ${user.company}</li>
                            <li>Website: ${user.blog}</li>
                            <li>Email: ${user.email}</li>
                            <li>Member since: ${user.created_at}</li>
                        </ul>
                    </div>
                </div>
                <h2 class="page-header">Latest Repositories</h2>
                <div class="github-repos"></div>
            `)
        })
    })
})
