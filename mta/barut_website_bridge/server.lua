-- Barut Gaming web site player bridge - SERVER ONLY
-- Publishes ONLY publicly visible in-game nicknames, never serials, IPs or account data.
-- The GitHub Actions runner reads http://SERVER_IP:HTTP_PORT/barut_website_bridge/players.
local function getPublicRoster()
    local list = {}
    for _, player in ipairs(getElementsByType("player")) do
        if isElement(player) then
            local nickname = tostring(getPlayerName(player) or "")
            nickname = nickname:gsub("#%x%x%x%x%x%x", ""):gsub("[%c]", "")
            if nickname ~= "" then
                list[#list + 1] = nickname:sub(1, 48)
            end
        end
    end
    table.sort(list, function(a, b) return a:lower() < b:lower() end)
    return list
end

-- MTA 1.6+ resource HTTP router
function httpRouter(request)
    if request.method ~= "GET" or request.path ~= "/players" then
        return { status = 404, body = "Not Found" }
    end
    local roster = getPublicRoster()
    return {
        status = 200,
        headers = {
            ["content-type"] = "application/json; charset=utf-8",
            ["cache-control"] = "no-store",
        },
        body = toJSON({
            players = roster,
            count = #roster,
        }, true)
    }
end
