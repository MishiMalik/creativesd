$(document).ready(function () {
    const fetchProjects = function () {
        $.ajax({
            url: "includes/ajax.php",
            method: 'post',
            data: { method: "fetchProjects", filters: getFiltersFromURL() },
            success: function (response) {

                // Remove existing items
                var $existingItems = $grid.find('.grid-item');
                $grid.isotope('remove', $existingItems);
                $("#no-projects").remove()

                let projects = JSON.parse(response);
                if (projects.length > 0) {
                    projects.forEach((project) => {
                        let projectTemplate = $("#project-template").html();
                        projectTemplate = projectTemplate.replace("{title}", project.title)
                            .replace("{id}", project.id)
                            .replace("{subtitle}", project.subtitle)
                            .replace("{image}", project.image.split(",")[0])
                            .replace("{image_srcs}", project.image)
                            .replace("{description}", project.description)
                            .replace("{alt}", project.title)

                        // $(".grid").append(projectTemplate)

                        var $newItems = $(projectTemplate);

                        // Append new items
                        $grid.append($newItems).isotope('appended', $newItems);
                        $grid.imagesLoaded().progress(function () {
                            $grid.isotope('layout');
                        });
                    })
                } else {
                    $(".grid").append("<div id='no-projects'>No projects found</div>")
                }
            }
        })
    }

    fetchProjects();

    $('.filter-list').on('click', '.select-tag', function () {
        fetchProjects();
    });

    $('.selected-tags').on('click', '.remove-tag', function () {
        fetchProjects();
    });
})